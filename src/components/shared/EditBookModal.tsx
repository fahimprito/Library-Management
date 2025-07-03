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
import type { Book, Genre } from "@/types/book";
import { useUpdateBookMutation } from "@/redux/api/bookApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

interface EditBookModalProps {
    book: Book;
}

interface EditFormInputs {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
}

const EditBookModal = ({ book }: EditBookModalProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditFormInputs>();
    const [updateBook, { isLoading }] = useUpdateBookMutation();

    useEffect(() => {
        setValue("title", book.title);
        setValue("author", book.author);
        setValue("genre", book.genre);
        setValue("isbn", book.isbn);
        setValue("description", book.description || "");
        setValue("copies", book.copies);
    }, [book, setValue]);

    const onSubmit = async (data: EditFormInputs) => {
        const updated = {
            ...data,
            available: data.copies > 0,
        };

        try {
            const res = await updateBook({ id: book._id, payload: updated }).unwrap();
            Swal.fire({
                title: "Success!",
                text: res.message || "Book updated successfully.",
                icon: "success",
                timer: 1500,
                position: "top-end",
                showConfirmButton: false,
            });
        } catch (error) {
            const message = (error as { data?: { message?: string } })?.data?.message || "Failed to update book.";
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
                <Button variant="outline" className="text-blue-600 hover:underline">Edit</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-center">Edit Book</DialogTitle>
                        <DialogDescription className="text-center">
                            Update the book information below.
                        </DialogDescription>
                    </DialogHeader>

                    {/* title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title", { required: "Title is required" })} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* author */}
                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" {...register("author", { required: "Author is required" })} />
                        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                    </div>

                    {/* genre */}
                    <div>
                        <Label htmlFor="genre">Genre</Label>
                        <select
                            id="genre"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            {...register("genre", { required: "Genre is required" })}
                        >
                            <option value="">Select Genre</option>
                            <option value="FICTION">Fiction</option>
                            <option value="NON_FICTION">Non-Fiction</option>
                            <option value="SCIENCE">Science</option>
                            <option value="HISTORY">History</option>
                            <option value="BIOGRAPHY">Biography</option>
                            <option value="FANTASY">Fantasy</option>
                        </select>
                        {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
                    </div>

                    {/* ISBN */}
                    <div>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input id="isbn" disabled {...register("isbn", { required: "ISBN is required" })} />
                        {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
                    </div>

                    {/* copies */}
                    <div>
                        <Label htmlFor="copies">Copies</Label>
                        <Input
                            id="copies"
                            type="number"
                            {...register("copies", {
                                required: "Copies are required",
                                min: { value: 0, message: "Minimum 0 copies" },
                            })}
                        />
                        {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
                    </div>

                    {/* description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
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

export default EditBookModal;