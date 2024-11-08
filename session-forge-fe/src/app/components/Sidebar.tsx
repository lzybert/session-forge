'use client';

import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js';
import { RiBookShelfLine, RiDashboardFill, RiAccountCircleLine, RiLoginCircleLine, RiBallPenLine } from '@remixicon/react';



export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <Link href="/dashboard">
          <ListIcon as={RiDashboardFill} color="white" />
          Dashboard
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/profile">
          <ListIcon as={RiAccountCircleLine} color="white" />
          Profile
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/">
          <ListIcon as={RiBookShelfLine} color="white" />
          Sessions
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/">
          <ListIcon as={RiLoginCircleLine} color="white" />
          Login
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/">
          <ListIcon as={RiBallPenLine} color="white" />
          Register
        </Link>
      </ListItem>
    </List>
  )
}