import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import '@radix-ui/themes/styles.css';
import { IssueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request:NextRequest){
   const session = await getServerSession(authOptions);
   if(!session)
   return NextResponse.json({},{status:404});
    const body = await request.json();
 const validation = IssueSchema.safeParse(body);
 if(!validation.success)
 return NextResponse.json(validation.error.format(),{status:400});

 const newIssue = await prisma.issue.create({
    data:{title:body.title,description:body.description}
 });
 return NextResponse.json(newIssue,{status:201});
}