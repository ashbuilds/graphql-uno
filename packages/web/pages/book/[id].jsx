import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import withApollo from '../../lib/withApollo';
import GET_BOOK from './book.graphql';

const Book = () => {
  const router = useRouter();

  const { id } = router.query || {};

  const { data = {}, loading } = useQuery(GET_BOOK, {
    variables: {
      id,
    },
    skip: !id,
  });
  if (loading) return 'loading...';
  const { book = {} } = data;
  const { title, description, publishedAt } = book;
  return (
    <div key={id}>
      <h4>{title}</h4>
      <p>{description}</p>
      <small>{publishedAt}</small>
    </div>
  );
};

export default withApollo(Book);
