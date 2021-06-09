/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { debounce } from 'lodash';

import { SEARCH_PRODUCTS_QUERY } from '../lib/queries';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
  const [findItems, { loading, error, data }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const items = data?.searchTerms || [];

  const findItemsDebounced = debounce(findItems, 650);

  // removes the problem of client vs server mismatch ids for downshift
  resetIdCounter();

  const {
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
    onSelectedItemChange() {
      console.log('selected item change');
    },
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
        {items.map((item, index) => (
          <DropDownItem
            key={item.id}
            {...getItemProps({ item })}
            highlighted={index === highlightedIndex}
          >
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="50px"
            />
            {item.name}
          </DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
}
