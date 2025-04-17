import { SidebarContainer } from '../components/Sidebar/SidebarContainer';
import { useUser } from '../../context/UserContext';
import { WhiteCard } from '../../components/ui/WhiteCard';

export const GeneralLayout = ({ children }) => {
    const { user, setUser } = useUser();
    const outterClassName = "flex w-full h-full";
    const sidebarDivClassName = "min-w-[200px] w-1/5";
    const mainClassName = "w-4/5 p-[20px]";
    if (!user){
        return <div className="flex w-full">
            <main>{children}</main>
        </div>;
    } 
    return (
    <div className={outterClassName}>
        <SidebarContainer user={ user } setUser={setUser} className={sidebarDivClassName}/>
        <div className={mainClassName}>
            <WhiteCard className='h-full w-full flex flex-col'>
                <main className='h-full w-full flex flex-col'>{children}</main>
            </WhiteCard>
        </div>
    </div>);
};

