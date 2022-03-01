import { Button } from '@chakra-ui/button'
import { Heading, Flex, Text } from '@chakra-ui/layout'
import type { NextPage } from 'next'
import { useTranslation } from '../utils/use-translation'
import Image from 'next/image'
import { confetti } from '../utils/confetti'
import { Link } from '@chakra-ui/react'

const localisation = {
  en: {
    title: 'Donate your yield to help'
  },
  fr: {
    title: 'Donnez votre rendement'
  }
}

const r = (mi: number, ma: number) => Math.random() * (ma - mi) + mi
let lastX = 0

const blastConfetti = (evt: MouseEvent, hard: boolean) => {
  const direction = Math.sign(lastX - evt?.clientX)
  lastX = evt.clientX
  const particleCount = hard ? r(122, 245) : r(2, 15)
  confetti({
    particleCount,
    angle: r(90, 90 + direction * 30),
    spread: r(45, 80),
    origin: {
      x: evt.clientX / window.innerWidth,
      y: evt.clientY / window.innerHeight
    }
  })
}

const Home: NextPage = () => {
  const translate = useTranslation(localisation)

  return (
    <Flex
      flex="1"
      direction="column"
      justifyContent="center"
      onClick={(evt: any) => {
        blastConfetti(evt, false)
      }}
    >
      <Flex direction="column" alignItems="center">
        <Heading fontSize={['1.4em', '1.7em', '2.1em']}>
          {translate('title')}{' '}
          <Text display="inline" color="ukraineYellow">
            Ukraine
          </Text>
        </Heading>

        <Flex mt="1vh" fontWeight="bold" alignItems="center" gap={5}>
          <Text fontSize={['2.2em', '2.8em', '4.2em']}>₴1,234,567.00</Text>
          <Text mt={['9px', '9px', '25px']} fontSize={['1em', '1.75em', '2em']}>
            {' '}
            donated
          </Text>
        </Flex>
        <Text
          color="rgba(255, 255, 255, 0.88)"
          fontWeight="bold"
          fontSize={['1.3em', '1.7em', '1.8em']}
        >
          Ξ123,456.00
        </Text>

        <Link href="/stake">
          <Button
            mt="5vh"
            color="black"
            w="180px"
            borderRadius="25px"
            bg="ukraineYellow"
            _hover={{
              bg: 'darkYellow'
            }}
            _active={{
              bg: 'darkYellow'
            }}
          >
            Stake
          </Button>
        </Link>
        <Link href="/donate">
          <Button
            mt="2vh"
            color="black"
            bg="white"
            w="180px"
            borderRadius="25px"
            _hover={{
              bg: '#DDD'
            }}
            _active={{
              bg: '#DDD'
            }}
          >
            Donate
          </Button>
        </Link>
      </Flex>
      <Flex
        display={['none', 'none', 'none', 'none', 'block']}
        position="fixed"
        bottom="0"
        right="55%"
        h="85%"
        w="700px"
        mr="50px"
      >
        <Image
          priority
          src="/statue.png"
          alt="Statue"
          layout="fill"
          objectFit="contain"
        />
      </Flex>
    </Flex>
  )
}

export default Home
