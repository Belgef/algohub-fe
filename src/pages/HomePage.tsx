import React, { useEffect, useState } from "react";
import HorizontalLessonList from "../components/HorizontalLessonList/HorizontalLessonList";
import { axiosInstance } from "../api";
import routes from "../api/apiRoutes";
import { Lesson } from "../interfaces";
import { AxiosError } from "axios";

const HomePage = () => {
  const [data, setData] = useState<Lesson[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();
  useEffect(() => {
    if (isLoading) {
      axiosInstance
        .get<Lesson[]>(`${routes.LESSONS_URL}/popular`)
        .then((response) => setData(response.data))
        .catch((reason) => setError(reason))
        .finally(() => setLoading(false));
    }
  });

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h3>{error.message}</h3>;
  return <HorizontalLessonList items={data} />;
};

export default HomePage