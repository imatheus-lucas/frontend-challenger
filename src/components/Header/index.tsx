import React from 'react'
import { Box, Flex, Container, Avatar, Image, Heading } from '@chakra-ui/react'
const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      p={5}
      height={47}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex flexDir="row" alignItems="center">
        <Image
          height={10}
          width={10}
          src="https://www.gstatic.com/images/branding/product/2x/keep_48dp.png"
          alt="keep"
        />
        <Heading px={5} size="md">
          Pharma Inc
        </Heading>
      </Flex>
      <Box>
        <Avatar height={10} width={10} />
      </Box>
    </Flex>
  )
}

export default Header
