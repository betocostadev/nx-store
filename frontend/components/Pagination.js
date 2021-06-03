import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { PAGINATION_QUERY } from '../lib/queries';
import { perPage } from '../config';

export default function Pagination({ page }) {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Nx store - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
