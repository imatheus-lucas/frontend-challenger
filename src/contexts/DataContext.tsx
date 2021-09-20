import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
type DataContextType = {
  listPatients: Array<listPatientsProps>;
  nextPage: () => void;
  loading: boolean;
  loadMore: boolean;
  selectPatient: (data: listPatientsProps) => void;
  selectedPatient: listPatientsProps | undefined;
  handleDataPatients: (data: any) => Array<listPatientsProps>;
};
export const DataContext = createContext({} as DataContextType);

export const useDataContext = () => useContext(DataContext);

type listPatientsProps = {
  id: string;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  completName: string;
  email: string;
  birthDate: Date;
  phone: string;
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  image: string;
  shareUrl: string;
  nat: string;
};

export const DataContextProvider = ({ children }: any) => {
  const [selectedPatient, setSelectedPatient] = useState<
    listPatientsProps | undefined
  >();
  const [listPatients, setListPatients] = useState<listPatientsProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, [page]);

  const selectPatient = (patient: listPatientsProps) => {
    setSelectedPatient(patient);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handleDataPatients = (data: any): Array<listPatientsProps> => {
    const patients = data.results.map((element: any) => {
      return {
        id: element.login.uuid,
        gender: element.gender,
        name: {
          title: element.name.title,
          first: element.name.first,
          last: element.name.last,
        },
        completName: `${element.name.title} ${element.name.first} ${element.name.last}`,
        email: element.email,
        birthDate: format(parseISO(element.dob.date), "dd/MM/yyyy"),
        phone: element.phone,
        location: {
          street: {
            number: element.location.street.number,
            name: element.location.street.name,
          },
          city: element.location.city,
          state: element.location.state,
          country: element.location.country,
          postcode: element.location.postcode,
        },
        image: element.picture.large,
        shareUrl: `http://localhost:3000/${element.id.name}`,
      };
    });

    return patients;
  };
  const fetchPatients = async () => {
    try {
      setLoadMore(true);
      const { data } = await api.get(`/?page=${page}&results=50&seed=abc`);
      if (data.results) {
        const patients = handleDataPatients(data);
        setListPatients((prevPatients) => [...prevPatients, ...patients]);
        setLoading(false);
        setLoadMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        listPatients,
        nextPage,
        loading,
        loadMore,
        selectPatient,
        selectedPatient,
        handleDataPatients,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
