import { ConsumerCreated } from '@/domain/events/domain-event/consumer-created.event';
import { ProposalSubmitted } from '@/domain/events/domain-event/proposal-submitted.event';
import { ProposalWithdrawn } from '@/domain/events/domain-event/proposal-withdrawn.event';
import { SchedulingCreated } from '@/domain/events/domain-event/scheduling-created.event';
import { ServiceRequestCreated } from '@/domain/events/domain-event/service-request-created.event';
import { ConsumerCreatedIntegrationEvent } from '@/domain/events/integration-event/consumer-created.integration.event';
import { ProposalSubmittedIntegrationEvent } from '@/domain/events/integration-event/proposal-submitted.integration.event';
import { ProposalWithdrawnIntegrationEvent } from '@/domain/events/integration-event/proposal-withdrawn.integration.event';
import { SchedulingCreatedIntegrationEvent } from '@/domain/events/integration-event/scheduling-created.integration.event';
import { ConsumerCreatedDomainEventHandler } from '@/infra/handlers/consumer-created-domain-event.handler';
import { ProposalSubmittedDomainEventHandler } from '@/infra/handlers/proposal-submitted-domain-event.handler';
import { ProposalWithdrawnDomainEventHandler } from '@/infra/handlers/proposal-withdrawn-domain-event.handler';
import { SchedulingCreatedDomainEventHandler } from '@/infra/handlers/scheduling-created-domain-event.handler';
import { ServiceRequestCreatedDomainEventHandler } from '@/infra/handlers/service-request-created-domain-event.handler';
import type { IntegrationEventsPublisher } from '@/infra/messaging/integration-events.publisher';
import type { DomainEventManager } from '@/shared/domain-event-emitter';

export class DomainEventRegistrationService {
  constructor(
    private readonly domainEventManager: DomainEventManager,
    private readonly integrationEventsPublisher: IntegrationEventsPublisher,
  ) {}

  /**
   * Registra todos os handlers de eventos de domínio
   */
  registerDomainEvent(): void {
    const consumerCreatedHandler = new ConsumerCreatedDomainEventHandler();
    const serviceRequestCreatedHandler =
      new ServiceRequestCreatedDomainEventHandler();
    const proposalSubmittedHandler = new ProposalSubmittedDomainEventHandler();
    const proposalWithdrawnHandler = new ProposalWithdrawnDomainEventHandler();
    const schedulingCreatedHandler = new SchedulingCreatedDomainEventHandler();
    const domainEvents = [
      {
        event: ConsumerCreated.name,
        handler: (data: ConsumerCreated) => consumerCreatedHandler.handle(data),
      },
      {
        event: ServiceRequestCreated.name,
        handler: (data: ServiceRequestCreated) =>
          serviceRequestCreatedHandler.handle(data),
      },
      {
        event: ProposalSubmitted.name,
        handler: (data: ProposalSubmitted) =>
          proposalSubmittedHandler.handle(data),
      },
      {
        event: ProposalWithdrawn.name,
        handler: (data: ProposalWithdrawn) =>
          proposalWithdrawnHandler.handle(data),
      },
      {
        event: SchedulingCreated.name,
        handler: (data: SchedulingCreated) =>
          schedulingCreatedHandler.handle(data),
      },
    ];

    domainEvents.forEach(({ event, handler }) => {
      this.domainEventManager.register(event, handler);
    });

    console.log('✅ Domain event handlers registered');
  }

  /**
   * Registra todos os handlers de eventos de integração
   */
  registerIntegrationEvent(): void {
    // ✅ Múltiplos eventos de forma limpa
    const integrationEvents = [
      {
        event: ConsumerCreated.name,
        handler: async (event: ConsumerCreated) => {
          const integrationEvent = new ConsumerCreatedIntegrationEvent(event);
          await this.integrationEventsPublisher.handle(integrationEvent);
        },
      },
      {
        event: ProposalSubmitted.name,
        handler: async (event: ProposalSubmitted) => {
          const integrationEvent = new ProposalSubmittedIntegrationEvent(event);
          await this.integrationEventsPublisher.handle(integrationEvent);
        },
      },
      {
        event: ProposalWithdrawn.name,
        handler: async (event: ProposalWithdrawn) => {
          const integrationEvent = new ProposalWithdrawnIntegrationEvent(event);
          await this.integrationEventsPublisher.handle(integrationEvent);
        },
      },
      {
        event: SchedulingCreated.name,
        handler: async (event: SchedulingCreated) => {
          const integrationEvent = new SchedulingCreatedIntegrationEvent(event);
          await this.integrationEventsPublisher.handle(integrationEvent);
        },
      },
      // No integration event for ServiceRequest yet
    ];

    integrationEvents.forEach(({ event, handler }) => {
      this.domainEventManager.registerForIntegrationEvent(event, handler);
    });

    console.log('✅ Integration event handlers registered');
  }
}
