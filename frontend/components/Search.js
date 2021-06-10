/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { SEARCH_PRODUCTS_QUERY } from '../lib/queries';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
  const router = useRouter();

  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const items = data?.searchTerms || [];

  const findItemsDebounced = debounce(findItems, 650);

  // removes the problem of client vs server mismatch ids for downshift
  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsDebounced({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/product/${selectedItem.id}`);
    },
    itemToString: (item) => (item === null ? '' : item.name),
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search here!',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              className="search-item"
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50px"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
