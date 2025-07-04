
export interface Borrow {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}


export interface BorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}
