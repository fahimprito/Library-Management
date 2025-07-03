import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Genre } from "@/types/book";
import { useAddBookMutation } from "@/redux/api/bookApi";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router";


interface AddBookFormValues {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    copies: number;
    description: string;
}

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddBookFormValues>();
    const navigate = useNavigate();
    const [addBook, { isLoading }] = useAddBookMutation();

    const onSubmit = async (data: AddBookFormValues) => {
        try {
            const res = await addBook(data).unwrap();
            if (res.success) {
                Swal.fire({
                    title: "Success!",
                    text: res.message || "Book added successfully",
                    icon: "success",
                    confirmButtonColor: "#10B981",
                });
                reset();
                navigate("/books");
            }
        } catch (error) {
            const message = (error as { data?: { message?: string } })?.data?.message || "Failed to add book.";
            Swal.fire({
                title: "Error",
                text: message,
                icon: "error",
                confirmButtonColor: "#EF4444",
            });
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">Add Book</h2>

            <div className="max-w-2xl border p-6 rounded-xl shadow">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Book title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* author */}
                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            placeholder="Author name"
                            {...register("author", { required: "Author is required" })}
                        />
                        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
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
                        {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
                    </div>

                    {/* ISBN */}
                    <div>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input
                            id="isbn"
                            placeholder="ISBN number"
                            {...register("isbn", { required: "ISBN is required" })}
                        />
                        {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                    </div>

                    {/* copies */}
                    <div>
                        <Label htmlFor="copies">Copies</Label>
                        <Input
                            id="copies"
                            type="number"
                            placeholder="Number of copies"
                            {...register("copies", {
                                required: "Copies are required",
                                min: { value: 1, message: "At least 1 copy required" },
                            })}
                        />
                        {errors.copies && <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>}
                    </div>

                    {/* description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Book description"
                            {...register("description", { required: "Description is required" })}
                            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <Button variant={"outline"} type="submit" className=" border-black text-green-700">
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default AddBook;