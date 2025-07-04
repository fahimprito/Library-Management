import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import type { Book } from "@/types/book";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { useGetBooksQuery } from "@/redux/api/bookApi";

interface BorrowFormValues {
    quantity: number;
    dueDate: string;
}

interface BorrowBookModalProps {
    book: Book;
}

const BorrowBookModal = ({ book }: BorrowBookModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BorrowFormValues>();
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const { refetch } = useGetBooksQuery();
    const navigate = useNavigate();

    const onSubmit = async (data: BorrowFormValues) => {
        console.log(data);
        
        try {
            const res = await borrowBook({
                book: book._id,
                quantity: data.quantity,
                dueDate: data.dueDate,
            }).unwrap();
            await refetch();

            Swal.fire({
                title: "Success!",
                text: res.message || "Book borrowed successfully.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            });

            reset();
            navigate("/borrow-summary");
        } catch (error) {
            console.log(error);
            
            const message = (error as { data?: { message?: string } })?.data?.message || "Failed to borrow book.";
            Swal.fire({
                title: "Error",
                text: message,
                icon: "error",
                confirmButtonColor: "#EF4444",
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-amber-500 hover:underline">Borrow</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-center">Borrow Book</DialogTitle>
                        <DialogDescription className="text-center">
                            Fill in the quantity and due date to borrow this book.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Quantity */}
                    <div>
                        <Label htmlFor="quantity">Quantity (max {book.copies})</Label>
                        <Input
                            id="quantity"
                            type="number"
                            {...register("quantity", {
                                required: "Quantity is required",
                                min: { value: 1, message: "At least 1 book required" },
                                max: { value: book.copies, message: `Only ${book.copies} copies available` },
                            })}
                        />
                        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                    </div>

                    {/* Due Date */}
                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            {...register("dueDate", { required: "Due date is required" })}
                        />
                        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Borrowing..." : "Confirm Borrow"}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBookModal;