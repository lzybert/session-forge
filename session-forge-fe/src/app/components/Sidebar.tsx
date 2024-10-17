'use client';

import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { AtSignIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';



export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <Link href="/">
          <ListIcon as={CalendarIcon} color="white" />
          Dashboard
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/">
          <ListIcon as={EditIcon} color="white" />
          Campaigns
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/">
          <ListIcon as={AtSignIcon} color="white" />
          Profile
        </Link>
      </ListItem>
    </List>
  )
}