import { Button } from '@/components/ui/button';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/bookApi';
import type { Book } from '@/types/book';
import Swal from 'sweetalert2';

const AllBooks = () => {
    const { data: books, isLoading, isError } = useGetBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
        });
        // console.log(result);
        if (result.isConfirmed) {
            try {
                const res = await deleteBook(id).unwrap();
                Swal.fire({
                    title: 'Deleted!',
                    text: res?.message || 'Book has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#10B981',
                    timer: 1600,
                    showConfirmButton: false,
                });
            } catch (error) {
                const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to delete book.';
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonColor: '#EF4444',
                });
            }
        }

    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Books</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isError && <p className="text-red-500">Failed to load books.</p>}
            {!isLoading && books?.length === 0 && (
                <p className="text-gray-500">No books available.</p>
            )}


            {!isLoading && books && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Author</th>
                                <th className="px-4 py-2 text-left">Genre</th>
                                <th className="px-4 py-2 text-left">ISBN</th>
                                <th className="px-4 py-2 text-left">Copies</th>
                                <th className="px-4 py-2 text-left">Availability</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-200">
                            {books.map((book: Book) => (
                                <tr key={book._id}>
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author}</td>
                                    <td className="px-4 py-2">{book.genre}</td>
                                    <td className="px-4 py-2">{book.isbn}</td>
                                    <td className="px-4 py-2">{book.copies}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {book.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <Button variant="outline" className="text-blue-600 hover:underline">Edit</Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDelete(book._id)}
                                            className="text-red-600 hover:underline">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllBooks;