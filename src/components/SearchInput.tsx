import { Input, InputGroup } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  return (
    <InputGroup startElement={<BsSearch />}>
      <Input type="text" placeholder="Search games..." onChange={(e) => onSearch(e.target.value)} />
    </InputGroup>
  );
};

export default SearchInput;
