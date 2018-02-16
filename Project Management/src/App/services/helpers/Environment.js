/*
* Author hannad rehman.
* this module is written to get app  environment name.
* we have 2 env's for the application
* 1. development
* 3. production
* based on these env's some configuration happen like what
* Api end points to select
*/

/**
 * @class
 * @name Environment
 * @description this class will have only one static method
 * which will return the final environment of the application
 */

class Environment {
  static get name() {
    return process.env.NODE_ENV.toLowerCase().trim();//eslint-disable-line
  }
}
export default Environment;
