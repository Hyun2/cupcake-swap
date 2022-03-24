import { ActionIcon, Menu, Text } from "@mantine/core";
import Image from "next/image";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import styled from "@emotion/styled";
import { connectMetamask } from "../utils";
import { useStore } from "../utils/store";

const Container = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: right !important;
`;

const HeaderContents = () => {
  const [walletAddress, setWalletAddress] = useStore((state) => [state.walletAddress, state.setWalletAddress]);

  return (
    <Container>
      {walletAddress && <Text>{walletAddress}</Text>}
      <Menu
        controlRefProp="ref"
        control={
          <ActionIcon>
            <MdOutlineAccountBalanceWallet style={{ width: 45, height: 45 }} />
          </ActionIcon>
        }
        trigger="hover"
        delay={200}
      >
        <Menu.Item>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              connectMetamask({ setWalletAddress });
            }}
          >
            <Image width={24} height={24} src="https://docs.metamask.io/metamask-fox.svg" alt="" />
            <span style={{ marginLeft: "10px", fontSize: "16px" }}>Metamask</span>
          </div>
        </Menu.Item>

        {/* <Menu.Item>
          <div style={{ display: "flex", alignItems: "center" }} onClick={() => {}}>
            <Image
              width={24}
              height={24}
              src="https://aws1.discourse-cdn.com/standard17/uploads/klaytn/original/1X/be6ab5b8b6246393c2c19d32ee75fab8e75f1157.jpeg"
              alt=""
            />
            <span style={{ marginLeft: "10px", fontSize: "16px" }}>Kaikas</span>
          </div>
        </Menu.Item> */}
      </Menu>
    </Container>
  );
};
export default HeaderContents;
