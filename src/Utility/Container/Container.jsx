const Container = ({children}) => {
    return (
        <div className="min-h-[calc(100vh-301px)] container mx-auto">
            {children}
        </div>
    );
};

export default Container;