import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import type { IBorrowSummary } from "@/types/borrow";

const BorrowSummary = () => {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery();

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isError && <p className="text-red-500">Failed to load summary.</p>}
            {!isLoading && data?.length === 0 && <p>No records found.</p>}

            {!isLoading && data && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-orange-100 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left">Book Title</th>
                                <th className="px-4 py-2 text-left">ISBN</th>
                                <th className="px-4 py-2 text-left">Total Quantity Borrowed</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-200">
                            {data.map((item: IBorrowSummary, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{item.book.title}</td>
                                    <td className="px-4 py-2">{item.book.isbn}</td>
                                    <td className="px-4 py-2">{item.totalQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BorrowSummary;