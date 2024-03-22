import React from 'react'
import prisma from '@/prisma/client'
import IssuaAction from './IssuaAction'
import { Issue, Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface props{
  searchParams: IssueQuery
}
const columns: { label: string; value:keyof Issue; className?:string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className:'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className:'hidden md:table-cell' },
];
const IssuesPage = async({searchParams}:props) => {
const statuses = Object.values(Status);
const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
const orderBy = columnNames.includes(searchParams.orderBy) ? {[searchParams.orderBy]:'asc'}: undefined;

const page = parseInt(searchParams.page) || 1;
const pageSize =10;
  const issues = await prisma.issue.findMany({
    where:{
      status
    },
    orderBy,
    skip:(page-1) * pageSize,
    take: pageSize
  });
  const issueCount = await prisma.issue.count({where:{status}})
  return (
    <Flex direction='column' gap='3'>
        <IssuaAction/>
        <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  )
}

export const metadata : Metadata={
  title: "Issue Tracker - Issue List",
  description: "View all project issue"
 };

export default IssuesPage