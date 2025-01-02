import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface IChangeParams {
  key: string;
  value?: string;
}

export function useSearchParamsManager(params: string[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsValues = useMemo(() => {
    return new Map<string, string | null>(
      params.map((item) => [item, searchParams.get(item)])
    );
  }, [params, searchParams]);

  const handleChangeParams = (params: IChangeParams[]) => {
    setSearchParams((sParams) => {
      params.forEach(({ key, value }) => {
        if (!value) sParams.delete(key);
        else sParams.set(key, value);
      });
      return sParams;
    });
  };

  return { params: paramsValues, setParams: handleChangeParams };
}
