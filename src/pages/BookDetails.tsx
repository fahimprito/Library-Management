import { useParams } from "react-router";
import { useGetBookQuery } from "@/redux/api/bookApi";
import EditBookModal from "@/components/shared/EditBookModal";
import BorrowBookModal from "@/components/shared/BorrowBookModal";

const BookDetails = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useGetBookQuery(id!);

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError || !book) return <p className="text-center mt-10 text-red-500">Book not found.</p>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col gap-3 mt-3 border p-6 rounded-lg shadow-md bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-5xl font-bold w-2/3">{book.title}</h2>
                </div>

                <div>
                    <h4 className="text-xl my-4">by: {book.author}</h4>
                </div>

                <div className="border my-2"></div>

                <h5 className="text-lg">Genre: {book.genre}</h5>

                <div className="border my-2"></div>

                <div>
                    <p><span className="font-bold">Description:</span> {book.description}</p>
                </div>

                <div className="border my-2"></div>

                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h5 className="text-lg">ISBN:</h5>
                        <p className="font-bold">{book.isbn}</p>
                    </div>
                    <div>
                        <h5 className="text-lg">Copies:</h5>
                        <p className="font-bold">{book.copies}</p>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <EditBookModal book={book} />
                    <BorrowBookModal book={book} />
                </div>
            </div>
        </div>
    );
};

export default BookDetails;