import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const cuisines = ['Italian', 'American', 'Indian', 'Thai'];

function CategoryTabs() {
  return (
    <motion.div
      className="tabs"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisines.map((cuisine) => (
        <NavLink
          key={cuisine}
          to={`/search/${cuisine}`}
          className="tab-item"
        >
          {cuisine}
        </NavLink>
      ))}
    </motion.div>
  );
}

export default CategoryTabs;
