import { Box, Text } from '@chakra-ui/layout'
import { Input, Button } from '@chakra-ui/react'
import AssetMenu from '../AssetMenu'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { usdcTokenAddress, prizePool } from '../../utils/poolTogether'
import { BigNumber, utils, ethers } from 'ethers'
import React, { useState } from 'react'
import { User } from '@pooltogether/v4-client-js'
import { useWallet } from '../../context/wallet-provider'

declare let window: any

const BoxDepositBox = () => {
  const [amountToDonate, setAmountToDonate] = useState(0)
  const [approve, setApprove] = useState(false)
  const [deposit, setDeposit] = useState(false)
  const { activateBrowserWallet, account } = useWallet()
  const tokenBalance = useTokenBalance(usdcTokenAddress, account)

  const handleStaking = async () => {
    if (account) {
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner()

      if (prizePool) {
        const user = new User(prizePool.prizePoolMetadata, signer, prizePool)
        try {
          setApprove(true)
          const approveTx = await user.approveDeposits()
          const approveReceipt = await approveTx.wait()
          setApprove(false)
          setDeposit(true)
          const depositTx = await user.depositAndDelegate(
            utils.parseUnits(BigNumber.from(amountToDonate).toString(), 6),
            '0x9BEB80ED2717AfB5e02B39C35e712A0571B73B69'
          )
          await depositTx.wait()
          setApprove(false)
          setDeposit(false)
        } catch (e) {
          setApprove(false)
          setDeposit(false)
        }
      }
    } else {
      activateBrowserWallet()
    }
  }

  const determineText = () => {
    if (account) {
      if (approve) return 'Approving...'
      if (deposit) return 'Depositing...'

      return 'Stake'
    }
    return 'Connect'
  }

  return (
    <>
      <Box
        backgroundColor="rgba(255,255,255,0.2)"
        width="100%"
        borderRadius="25px"
        display="flex"
        paddingX="25px"
        paddingY="20px"
        mb="28px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box color="white">
          <Input
            fontSize="36px"
            fontWeight="bold"
            border="none"
            focusBorderColor="none"
            type="number"
            value={amountToDonate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmountToDonate(parseInt(e.target.value))
            }
            pl={0}
          />
          <Text color="#DADADA">
            Balance: {tokenBalance ? utils.formatUnits(tokenBalance, 6) : 0.0}
          </Text>
        </Box>
        <Box color="white">
          <AssetMenu />
        </Box>
      </Box>
      <Button
        _hover={{ color: 'black', background: 'white' }}
        backgroundColor="ukraineYellow"
        color="black"
        width="455px"
        height="80px"
        borderRadius="25px"
        onClick={handleStaking}
        disabled={approve || deposit}
      >
        <Text fontSize="3xl">{determineText()}</Text>
      </Button>
    </>
  )
}

export default BoxDepositBox
