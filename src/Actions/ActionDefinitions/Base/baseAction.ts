/**
 * Base class for actions performed by creeps.
 */
export class BaseAction {
  protected m_creep: Creep;

  /**
   * Optional method to execute an action.
   * @param creep - The creep performing the action.
   */
  protected Execute?(creep: Creep): void;

  /**
   * Optional method to check if an action can be executed.
   * @param creep - The creep performing the action.
   * @returns True if the action can be executed, false otherwise.
   */
  protected CanExecute?(creep: Creep): boolean;

  /**
   * Creates an instance of BaseAction.
   * @param creep - The creep performing the action.
   */
  constructor(creep: Creep) {
    this.m_creep = creep;
  }
}
