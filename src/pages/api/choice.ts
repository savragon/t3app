import { type NextApiRequest, type NextApiResponse } from "next";


import { PrismaClient } from "@prisma/client";

const choice = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id, choice} = req.body
    const prisma = new PrismaClient();

    if(choice > 2 || choice < 0) {
        return res.status(401).json({"error": "choices out of range"})
    }

    const question = await prisma.answer.create({
        data: {
            questionId: id,
            option: choice
        }
    })
}