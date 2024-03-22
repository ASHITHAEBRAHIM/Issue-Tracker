'use client'
import { Spinner } from '@/app/components'
import { Issue } from '@prisma/client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
    const router = useRouter();
    const[error,setError] = useState(false);
    const[isDeleting,setDeleting] = useState(false);

    const deleteIssue = async() => {
        try{
            setDeleting(true);
            await axios.delete('/api/issues/list' + issueId);
            router.push('/issues');
            router.refresh();
        }
        catch(error)
        {
            setDeleting(false);
            setError(true);
        }
    }
  return (
    <>
    <div>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button color='red'  disabled={isDeleting}>Delete Issue {isDeleting && <Spinner/>}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
            <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete this issue ? This action cannot be undone.
            </AlertDialog.Description>
            <Flex mt='4' gap='3'>
<AlertDialog.Cancel>
    <Button color='gray' variant='soft'>Cancel</Button>
</AlertDialog.Cancel>
<AlertDialog.Action>
    <Button color='red' onClick={deleteIssue}> Delete Issue</Button>
</AlertDialog.Action>
            </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>This Issue Could not be deleted</AlertDialog.Description>
                <Button color='gray' variant='soft' mt='2' onClick={()=>setError(false)}>OK</Button>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>
    </>
  )
}

export default DeleteIssueButton