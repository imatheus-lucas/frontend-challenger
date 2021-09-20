import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Avatar,
  Text,
  Box,
} from "@chakra-ui/react";
import { useDataContext } from "../../contexts/DataContext";

type DetailsUserProps = {
  isOpen: boolean;
  onClose: () => void;
};
const DetailsUser = ({ isOpen, onClose }: DetailsUserProps) => {
  const { selectedPatient } = useDataContext();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex height="130" justify="center" alignItems="center">
              <Avatar
                width="15"
                height="auto"
                objectFit="cover"
                src={selectedPatient?.image}
              />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" justify="center" alignItems="center">
              <Box textAlign="center">
                <Box textAlign="center">
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedPatient?.completName}
                  </Text>
                </Box>
                <Text fontSize="md">{selectedPatient?.email}</Text>

                <Text fontSize="md">{selectedPatient?.phone}</Text>
                <Text fontSize="md">{selectedPatient?.nat}</Text>
                <Flex justify="space-between" my="5">
                  <Text mx="1" fontSize="md">
                    {selectedPatient?.location.street.name},
                  </Text>
                  <Text mx="1" fontSize="md">
                    {selectedPatient?.location.street.number},
                  </Text>
                  <Text mx="2" fontSize="md">
                    {selectedPatient?.location.city},
                  </Text>
                  <Text mx="2" fontSize="md">
                    {selectedPatient?.location.state}.
                  </Text>
                </Flex>

                <Text fontSize="lg">{selectedPatient?.nat}</Text>
                {/* <Text fontSize="lg" >
                  {selectedPatient?.shareUrl}
                </Text> */}
              </Box>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    String(selectedPatient?.shareUrl)
                  );
                }}
              >
                Share
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsUser;
