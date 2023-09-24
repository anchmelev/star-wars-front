import React from "react";
import { Error } from "@app/components/ui-kit/Error/Error";
import { PageTitle } from "@app/components/ui-kit/PageTitle/PageTitle";
import error404 from "@app/assets/images/error404.svg";

const Error404Page: React.FC = () => {
  return (
    <>
      <PageTitle>Ошибка клиента</PageTitle>
      <Error img={error404} msg="Sorry, page not found!" />
    </>
  );
};

export default Error404Page;
