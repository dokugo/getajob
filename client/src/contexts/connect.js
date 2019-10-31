export default function withMyContext(Component) {
  <MyContext.Consumer>{value => <Component {...value} />}</MyContext.Consumer>;
}
