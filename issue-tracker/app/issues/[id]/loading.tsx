'use client'
import React from 'react'
import { Heading,Flex,Text,Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Heading><Skeleton/></Heading>
        <Flex className='space-x-3 my-2'>
      <Skeleton width='5rem'/>
        <Text><Skeleton width='8rem'/></Text>
        </Flex>
        <Card className='prose mt-4'>
        <Skeleton count={3}/>
        </Card>  
    </Box>
  )
}

export default LoadingIssueDetailPage