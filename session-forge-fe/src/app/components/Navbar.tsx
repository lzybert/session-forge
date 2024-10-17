'use client';

import { Flex, Heading, Box, Text, Button, Spacer, HStack } from "@chakra-ui/react"

export default function Navbar() {
  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">My Campaigns</Heading>
      <Spacer />

      <HStack spacing="20px">
        <Box bg="gray.200" p="10px 15px" borderRadius="50%">M</Box>
        <Text>Lukasz Zybert</Text>
        <Button colorScheme="purple">Logout</Button>
      </HStack>
    </Flex>
  )
}