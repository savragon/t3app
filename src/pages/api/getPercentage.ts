import { type NextApiRequest, type NextApiResponse } from "next";


import { PrismaClient } from "@prisma/client";

const getquestions = async (req: NextApiRequest, res: NextApiResponse) => {

    const {id} = req.query

    if(!id) return res.status(400).json({
        error: true,
        message: "You did not provide an ID"
    })
    
    const prisma = new PrismaClient();

    const questions = await prisma.answer.findMany({
        where: {
            questionId: id as string
        },     
    })

    const numbers = questions.map(i => i.option)

    const length = numbers.length
    
    let count = 0
    numbers.forEach(i => {
        if(i == 1) count++
        console.log(count)
    })


    const percentage = Math.round((count/length)*100)

    const percentage2 = 100-percentage


    res.status(200).json({percentage, percentage2})



}

export default getquestions