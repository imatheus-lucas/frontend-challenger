import {
  Input,
  InputRightElement,
  InputGroup,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Checkbox,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

import { FiSettings } from "react-icons/fi";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <InputGroup w="100%" marginY={10}>
        <Input placeholder="Searching" />
        <InputRightElement
          onClick={onOpen}
          _hover={{
            bg: "gray.100",
            color: "gray.800",
            cursor: "pointer",
          }}
          children={<Icon as={FiSettings} color="gray.500" />}
        />
      </InputGroup>
      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading color="gray.700" size="md" marginBottom={4}>
                  Gender
                </Heading>
                <Flex flexDir="column">
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, e.target.checked])
                    }
                    value="all"
                    defaultIsChecked
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedItems[0]}
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[1]])
                    }
                    value="women"
                  >
                    Woman
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedItems[1]}
                    onChange={(e) =>
                      setCheckedItems([checkedItems[0], e.target.checked])
                    }
                    value="male"
                  >
                    Male
                  </Checkbox>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Search;
