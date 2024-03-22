import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

interface props{
    params:{id:string}
}
const IssueForm = dynamic(
    () => import('@/app/issues/components/IssueForm'),
    {
      ssr : false,
      loading:() => <IssueFormSkeleton/>
    }
  );
const EditIssuePage = async ({params}:props) => {
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!issue) notFound();
  return (
    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage