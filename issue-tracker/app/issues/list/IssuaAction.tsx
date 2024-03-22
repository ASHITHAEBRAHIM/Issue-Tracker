import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'
const IssuaAction = () => {
  return (
    <div>
        <Flex justify='between'>
          <IssueStatusFilter/>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      </Flex>
    </div>
  )
}

export default IssuaAction