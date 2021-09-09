import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
  Flex,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { Spinner } from "@chakra-ui/react";
import { FixedSizeList as List } from "react-window";
import DetailsUser from "../DetailsUser";
const ListUsers = () => {
  const { listPatients, nextPage, loadMore,selectPatient } = useDataContext();
  const tableBottomRef = useRef<HTMLTableCellElement>(null);
  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        nextPage();
      }
    });
    intersectionObserver.observe(tableBottomRef.current!);
    return () => intersectionObserver.disconnect();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function setSelectedPatient(patient: any) {
    selectPatient(patient);
    onOpen();
  }

  return (
    <>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Gender</Th>
            <Th>Birth</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {listPatients.map((patient) => (
            <Tr key={patient.id}>
              <Td>{patient.completName}</Td>
              <Td>{patient.gender}</Td>

              <Td>{patient.birthDate}</Td>
              <Td>
                <Button onClick={() => setSelectedPatient(patient)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td minHeight={350} colSpan={4} ref={tableBottomRef}>
              {loadMore && (
                <Flex  justify="center" marginBottom="125" align="center">
                  <Spinner size="xl" />
                </Flex>
              )}
            </Td>
          </Tr>
        </Tfoot>
      </Table>
      <DetailsUser isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ListUsers;
