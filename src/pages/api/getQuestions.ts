import { type NextApiRequest, type NextApiResponse } from "next";


import { PrismaClient } from "@prisma/client";

const getquestions = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const prisma = new PrismaClient();

    const questions = await prisma.question.findMany({})


    res.status(200).json(questions)

}

export default getquestions