import { Link } from "react-router-dom";
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ pageName, items }) => {
  const breadcrumbs = items || [{ name: 'Trang chủ', href: '/' }, { name: pageName || '' }];

  return (
    <div className="flex  items-center mt-3 ">
      <div className="flex group items-center">
        <FontAwesomeIcon
          icon={faHouse}
          className="text-xl mx-3 group-hover:text-blue-500"
        />
        <Link
          to="/"
          className="text-lg font-bold group-hover:text-blue-500"
        >
          Trang chủ
        </Link>
      </div>

      {/* Các mục tiếp theo */}
      {breadcrumbs.slice(1).map((item, index) => (
        <div key={index} className="flex items-center ml-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-lg mr-3"
          />
          {item.href ? (
            <Link
              to={item.href}
              className="text-lg font-bold hover:text-blue-500"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-lg font-bold">{item.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
