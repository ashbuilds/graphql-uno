import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
// import 'moment/min/locales.min';

import withApollo from '../../lib/withApollo';
import GET_AUTHORS from './authors.graphql';

// moment.locale('th');
const Authors = () => {
  const { data = {}, loading } = useQuery(GET_AUTHORS);
  if (loading) return 'loading...';
  const { authors = [] } = data;
  return (
    <div>
      <ul>
        {authors.map(({ name, books, id }) => (
          <li key={id}>
            <h3>{name}</h3>
            <ul>
              {books.map(({ title, id: bookId, publishedAt }) => (
                <li key={bookId}>
                  <h4>{title}</h4>
                  <small>{moment(publishedAt).format('DD MMM YYYY')}</small>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withApollo(Authors);
