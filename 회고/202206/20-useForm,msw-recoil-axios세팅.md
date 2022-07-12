# 20220620

<details>
<summary>시간대별 정리</summary>

### 아침

주간회고 및 일일회고 작성

pr구경

### 오전

버튼 컴포넌트 리팩토링

### 오후

버튼 컴포넌트 리팩토링

svg 사용 고군분투

useForm hooks

### 저녁

common컴포넌트 스타일 방식 2가지 중 고민

axios & recoil & msw 세팅

constant 변수화

mock데이터

</details>
<br>

# 코드스쿼드

> mock세팅, useForm

### msw + recoil + axios 세팅

서버상태를 적절하게 fetch하는 로직에 초점을 맞추다보니 로컬상태로 관리할게 많이 없다.

데이터를 어느 시점에 적절하게 요청하고, 캐싱하는 일이 더 중요한 것 같다.

### useForm

react-hooks-form 라이브러리와 비슷하게 hooks를 만들려고 시도했다. 같이 프로젝트를 진행하는 geon이 내가 생각한대로 pattern을 이용해 적절하게 구현해주셨다.

다만 아쉬운 점은

- jsx에 validate가 들어가게되는데 나는 service코드를 UI코드에서 분리하고 싶었다.
- input마다 별도의 validate함수를 만들어서 넘겨줘야할 것 같은데, 지금 상태도 대부분의 케이스를 커버할 수 있는지 테스트해볼 방법이 생각나지 않는다.

```tsx
export default function LoginForm() {
  const onSubmit = async (values: { [key: string]: string }) => {
    console.log(values);
  };
  const { register, errors, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}
      <label>
        <div>비밀번호</div>
        <input name="password" {...register('password', { minLength: 6, maxLength: 16, pattern : 생략 })} />
        {errors.password?.minLength && <span>6자 이상 입력해주세요</span>}
        {errors.password?.maxLength && <span>16자 이하로 입력해주세요</span>}
      </label>
      <Button onClick={() => {}}>아이디로 로그인</Button>
    </form>
  );
}

export default function useForm() {
  const [values, setValues] = useState<StringObject>({});
  const [errors, setErrors] = useState<ErrorsProps>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (name: string, value: string, options: RegisterOptionsProps) => {
    const error: ErrorProps = {};
    if (!!options.minLength && value.length < options.minLength) {
      error.minLength = true;
    }
    if (!!options.maxLength && value.length > options.maxLength) {
      error.maxLength = true;
    }
    if (!!options.pattern && value.match(options.pattern) === null) {
      error.pattern = true;
    }
    setErrors({ ...errors, [name]: error });
  };

  const register = (name: string, options: RegisterOptionsProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      validate(name, value, options);
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    return {
      value: values[name],
      onChange,
    };
  };

  const handleSubmit = (onSubmit: any) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = Object.values(errors).every(error => Object.values(error).length === 0);
      if (!isValid) {
        return;
      }
      if (!isLoading) {
        setIsLoading(true);
        await onSubmit(values);
        setIsLoading(false);
      }
    };
  };

  return {
    register,
    values,
    errors,
    handleSubmit,
  };
}
```
