type Income = {
    type: string
    programID: string
    programPic: string
    name: string
    buyer: {
        studentID: string
        studentName: string
    }
    price: number
    purchaseTime: Date
}

export type {Income}