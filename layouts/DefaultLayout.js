const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-between min-h-screen  bg-fixed bg-no-repeat bg-cover     ">
      <>
        <main className=" bg-slate-100 grow  ">{children}</main>
      </>
    </div>
  );
};
export default DefaultLayout;
