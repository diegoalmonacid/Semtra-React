import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GrFormNext } from "react-icons/gr";

export const Sidebar = (props) => {
    
    const { sections } = props;

    Sidebar.propTypes = {
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
            })
        ).isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        }).isRequired,
    };

    const renderSections = () => {
        return sections.map((section, index) => (
            <li key={index}>
                <Link
                    to={section.path}
                    className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
                >
                    <GrFormNext className="text-gray-500" />
                    <span>{section.title}</span> 
                </Link>
            </li>
        ));
    };    


    return (
        <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                    />
                <div>
                <h3 className="text-gray-800 font-semibold">Diego Almonacid</h3>
                <p className="text-gray-500 text-sm">Asociado</p>
            </div>
        </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-4">
                    {renderSections()}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button className="w-full bg-green-600 py-2 rounded text-sm hover:bg-gray-500 transition">
                    Logout
                </button>
            </div>
        </div>
    );
};
