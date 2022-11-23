## Getting Started

First, run the development server:

```bash
yarn

yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note: Checking UI can re-use
	- Go to src/components/header, open comment line 9, 477 to use

## I. Thứ tự import của 1 page hoặc component

  1) Import từ node_modules
    - react
    - react-router-dom
    - proptypes
    - thư viện UI (reactstrap)
    - các phần con lại là bảng chữ cái
    - css của thư viện

  2) Import theo chức năng
    - api
    - assets
    - constants
    - routes
    - store
    - utils

  3) Import theo component
    - Layout: Theo bảng chữ cái
    - pages: Theo bảng chữ cái
    - components: : Theo bảng chữ cái

  4) Import static nội bộ của page/ component
    - css/ sass


## II. Thứ tự viết style cho css/sass

  div {
    // block
    display
    width
    height
    padding top => bottom => left => right
    margin top => bottom => left => right

    // position
    position
    top
    bottom
    left
    right

    // text
    color
    fontFamily
    fontSize,
    textDecoration

    // effect
    animation
    tranform

    // layout
    z-index
  }


## III. Thứ tự viết api/ action/ saga

  1) Get all
  2) Get list
  3) Get detail
  4) Add new
  5) Edit | Update
  6) Delete
  7) Restore

## IV. Thứ tự props

  thư viện truyền từ APP hoặc index vào component (ví dụ: match, navigate)
  bool

  number
  string

  object
  arr

  function

## V. Thứ tự tạo biến | hàm trong component

  1. props
  2. useRef | useHistory | other use... sắp xếp theo thứ tự bảng chữ cái
  3. useState
  4. state of library (useFormik)
  5. useEffect
  6. render Html
  7. function (sắp xếp linh hoạt theo Eslint)
  8. return
  9. prop types
    9.1 Thứ tự prop types
    Khai báo default trước ví dụ: match, navigate,...
    Khai báo các props từ saga theo thứ tự bool - num - string - object - arr - func tương tự 'Thứ tự props'
  10. default props
    Khai báo các props từ saga theo thứ tự bool - num - string - object - arr - func tương tự 'Thứ tự props'

## VI. Dùng lazy react (dynamic trong next js)

  1. Khi render dữ liệu

## VII. Dùng dompurity

  1. Tìm hiểu thêm về ```dangerouslySetInnerHTML```
  2. Một số bảo mật về reactjs [https://reactsecurity.io/]

## VIII. Đặt tên action type

  GET_SOMETHING_ALL
  GET_SOMETHING_ALL_SUCCESS
  GET_SOMETHING_ALL_FAILED

  GET_SOMETHING_LIST
  GET_SOMETHING_LIST_SUCCESS
  GET_SOMETHING_LIST_FAILED

  SEARCH_SOMETHING

  GET_SOMETHING
  GET_SOMETHING_SUCCESS
  GET_SOMETHING_FAILED

  ADD_SOMETHING
  ADD_SOMETHING_SUCCESS
  ADD_SOMETHING_FAILED

  UPDATE_SOMETHING
  UPDATE_SOMETHING_SUCCESS
  UPDATE_SOMETHING_FAILED

  DELETE_SOMETHING
  DELETE_SOMETHING_SUCCESS
  DELETE_SOMETHING_FAILED

  REMOVE_SOMETHING
  REMOVE_SOMETHING_SUCCESS
  REMOVE_SOMETHING_FAILED

  RESTORE_SOMETHING
  RESTORE_SOMETHING_SUCCESS
  RESTORE_SOMETHING_FAILED

## VIII. Đặt tên biến

  modalAdd: false, => isShowAddModal
  modalEdit: false, => isShowEditModal
  modalDelete: false, => isShowEditModal
  modalComplete: false, => isShowCompleteModal

  cách đặt tên biến trong reducer mới
    projectList
    projectDetail
    projectTotal
    employeeProfile || employeeDetail
    đối tượng là người sử dụng profile thay cho detail

## IX. Đặt tên hằng số

  string | number: UPPERCASE
  object : camelCase
  array: camelCase
  
  vd: 
  TOKEN = 'xxxxx',
  LIMIT = 20,
  USER_GENDER = {
    MALE: 'male',
    FEMALE: 'female',
  }

  USER_GENDER_SELECT_LIST = [
    {
      value: USER_GENDER.MALE
    },
        {
      value: USER_GENDER.FEMALE
    },
  ]
