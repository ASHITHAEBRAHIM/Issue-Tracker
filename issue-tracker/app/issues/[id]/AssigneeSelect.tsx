'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import {Skeleton} from '@/app/components';
import toast,{Toaster} from 'react-hot-toast';

    const AssigneeSelect = ({issue}:{issue:Issue}) => {
    const{data:users,error,isLoading}= useQuery<User[]>({
        queryKey:['User'],
        queryFn:()=>axios.get('/api/users').then(res=>res.data),
        staleTime:60*1000,
        retry:3
    });
    if(isLoading) return <Skeleton/>
    if(error) return null;

    const assignIssue = (userId: string) => {
        axios
          .patch("/api/issues/" + issue.id, {
            assignedToUserId: userId || null,
          })
          .catch(() => {
            toast.error("Changes could not be saved.");
          });
      };
    
  return (
    <div>
        <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={assignIssue}>
            <Select.Trigger placeholder='Assignee...'></Select.Trigger>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                   <Select.Item value='null'>Unassigned</Select.Item>
                    {users?.map(user=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </div>
  )
}

export default AssigneeSelect