import generator from 'generate-password';
let counter = 0;
const randomPassword = () => {
 let password = generator.generate({
   length: 10,
   numbers: true,
 });
 
 return password;
};
 
export {randomPassword};