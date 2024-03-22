import { IssueSchema,PatchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";
import { error } from "console";

export async function PATCH(request:NextRequest,
    {params}:{params:{id:string}}
    ){
        const session = await getServerSession(authOptions);
        if(!session)
        return NextResponse.json({},{status:401});
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status:400})

    const{assignedToUserId,title,description} = body;
    if(assignedToUserId){
        const user = await prisma.user.findUnique({
            where:{id:assignedToUserId}
        })
        if(!user){
            return NextResponse.json({error:'Invalid User'},{status:400});
        }
    }
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!issue)
    return NextResponse.json({error:"InvalidIssue"},{status:404})

    const updatedIssue = await prisma.issue.update({
        where: {id:issue.id},
        data:{
            title,
            description,
            assignedToUserId
        }
    });
    return NextResponse.json(updatedIssue);
}

export async function DELETE(request:NextRequest,
    {params}:{params:{id:string}}
    ){
        const session = await getServerSession(authOptions);
        if(!session)
        return NextResponse.json({},{status:404});
    
const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
});
if(!issue)
return NextResponse.json({error:"Invalid"},{status:404})

await prisma.issue.delete({
    where:{id:issue.id}
});
return NextResponse.json({});
    }