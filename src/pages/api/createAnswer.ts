import { type NextApiRequest, type NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const createAnswer = async (req: NextApiRequest, res: NextApiResponse) => {
    const {questionId, option} = req.body
    const prisma = new PrismaClient();

    if(questionId > 2 || option < 0) {
        return res.status(401).json({"error": "choices out of range"})
    }

    const question = await prisma.answer.create({
        data: {
            questionId: questionId,
            option : option
        }
    })

    res.status(200).json({
        success: true
    })
}

export default createAnswer