'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import {useSession} from 'next-auth/react';
import {Skeleton} from '@/app/components';

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                <Link href='/'><AiFillBug /></Link>
                <NavLinks/>
                </Flex>
                <AuthStatus/>
            </Flex>
        </Container>
    </nav>
  )
}

const NavLinks = ()=>{
    const currentpath = usePathname();
    const links = [
        {label:"Dashboard" , href:'/'},
        {label:"Issues", href:'/issues/list'}
    ]
    return(
        <ul className='flex space-x-6'>
            {links.map(link => 
            <li>
            <Link key={link.href} href={link.href} 
            className={
                classNames({
                    'nav-link':true,
                    '!text-zinc-900':link.href===currentpath,
                })
            }>{link.label}
            </Link>
            </li>
            )}
        </ul>
    )
}
const AuthStatus = () =>{
    const{status,data:session} = useSession();
    if(status === 'loading') return <Skeleton width='3rem'/>;

    if(status === 'unauthenticated')
    return <Link href='/api/auth/signin' className='nav-link'>Login</Link>

return(
    <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback='?' size='2' radius='full' className='cursor-pointer'/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
               </Box>     
)
}

export default NavBar