import { Driver } from '../../../webdriver/driver';

class UpdateModal {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async checkPageIsLoaded() {
    try {
      await this.driver.waitForSelector({ testId: 'update-modal' });
      console.log('Update modal is loaded');
    } catch (e) {
      console.error('Timeout while waiting for update modal to be loaded', e);
      throw e;
    }
  }

  async checkPageIsNotPresent() {
    const isPresent = await this.driver.isElementPresent({ testId: 'update-modal' });
    if (isPresent) throw new Error('Update modal should not be present');
  }

  async confirm() {
    await this.driver.clickElementAndWaitForWindowToClose({ testId: 'update-modal-submit-button' });
  }

  async close() {
    await this.driver.clickElementAndWaitToDisappear({ testId: 'update-modal-close-button' });
  }
}

export default UpdateModal;
